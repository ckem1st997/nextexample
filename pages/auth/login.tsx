import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    SelectItem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { GetServerSidePropsContext } from 'next';
import { getCsrfToken, getProviders, signIn, signOut, useSession } from 'next-auth/react';
import router, { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { Auth } from '../../extension/auth';
import { MessageService } from './../../service/MessageService';
import { setCookie } from 'cookies-next';
import { newCookie } from '../../extension/helpers';
import { useCallback, useEffect } from 'react';
import { redirect } from 'next/dist/server/api-utils';
import { MessageResponse, ResultMessageResponse } from '../../model/ResultMessageResponse';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';


export default function AuthenticationTitle({ csrfToken, providers, url }: { csrfToken: any; providers: any; url: string }) {
    // đây là phần xử lý bên client
    const router = useRouter();
    //  const callbackUrl = router.query.callbackUrl?.toString()

    const callbackUrl = router.query.callbackUrl?.toString() ?? `/home`;

    const handleSubmit = useCallback(async (v: any) => {
        await signOut({ redirect: false });
        const username = v.userName;
        const password = v.passWord;
        const data = {
            username: username,
            password: password
        }
        const res = await fetch(url + '/AuthorizeMaster/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        const user = await res?.json() as Promise<MessageResponse<any>>;
        const jwt = (await user).data;
        if (res.ok && user && (await user).success && (await user).data && jwt.jwt) {

            const reslogin = await signIn('credentials',
                {
                    // tham số truyền vào chính là tham số bên call api
                    username,
                    password,
                    userId: jwt.user.id,
                    jwt: jwt.jwt,
                    callbackUrl: callbackUrl,
                    redirect: false,
                }
            )
            console.log(reslogin)

            // if (reslogin?.error)
            //     handleError(reslogin.error)
            if (reslogin?.url && reslogin.ok) {
                // window.location.href = callbackUrl ?? reslogin.url;
                MessageService.SuccessTimeonClose("Đăng nhập thành công !", callbackUrl ?? reslogin.url);
                // showNotification({
                //     onOpen: () => {router.push(callbackUrl ?? reslogin.url)},
                //     autoClose: 1000,
                //     title: 'Thông báo',
                //     message: "Đăng nhập thành công !",
                //     icon: <IconCheck />,
                //     color: 'green'
                //   });
            }
            else
                MessageService.Fails("Đăng nhập thất bại !");
        }
        else
            MessageService.Fails((await user).message ?? ((await user).errors?.msg[0]));


    }, [])



    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch(callbackUrl)
    }, []);

    const form = useForm({
        initialValues: {
            userName: 'admin@gmail.com',
            passWord: '123456',
            remember: true,
        },
        validate: {
            userName: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });




    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome back!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form
                    onSubmit={form.onSubmit((values) =>
                        handleSubmit(values))
                    }
                >
                    {/* {providers &&
                        Object.values(providers).map((provider: any) => (
                            <div key={provider.name} style={{ marginBottom: 0 }}>
                                <button onClick={() => signIn(provider.id)} >
                                    Sign in with{' '} {provider.name}
                                </button>
                            </div>
                        ))} */}
                    <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                    <TextInput label="Email" placeholder="you@mantine.dev" required  {...form.getInputProps('userName')} />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md"   {...form.getInputProps('passWord')} />
                    <Group position="apart" mt="lg">
                        <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
                        <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button type="submit" fullWidth mt="xl">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}





async function login(v: any, url: string | undefined) {
    console.log(url);

    const userName = v.userName;
    const passWord = v.passWord;
    const reslogin = await signIn('credentials',
        {
            // tham số truyền vào chính là tham số bên call api
            userName,
            passWord,
            callbackUrl: url ?? `/home`,
            redirect: false,
        }
    );

    // if (reslogin?.error)
    //     handleError(reslogin.error)
    if (reslogin?.url && reslogin.ok) {
        const auth = Auth;
        const check = await auth.userCheck();
        if (check && check.jwt !== undefined && check.jwt.length > 0) {
            setCookie('user', JSON.stringify(check), newCookie);
            MessageService.Success("Đăng nhập thành công !");
            router.push(reslogin.url);
        }
        else
            MessageService.Fails("Đăng nhập thất bại !");
    }
    else
        MessageService.Fails("Đăng nhập thất bại !");
    // const res = await auth.signIn(v.userName, v.passWord);
    // console.log(res)
    // if (!res.success) {
    //     MessageService.Fails(res.message);
    // }
    // else
    //     MessageService.Success("Đăng nhập thành công !");


    // MessageService.Fails("111111");
    // MessageService.Info("111111");
    // MessageService.Warn("111111");

    // Service.CreateUnit(v).then(x => {
    //     if (x.success)
    //         MessageService.Success("Thêm thành công !");

    //     else
    //         MessageService.Fails("Thêm thất bại !");
    // });

}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // đây là phần xử lý bên service
    const providers = await getProviders()
    const csrfToken = await getCsrfToken(context);
    const url = process.env.MASTER_API_URL;
    debugger
    return {
        props: {
            providers,
            csrfToken,
            url
        },
    }
}
