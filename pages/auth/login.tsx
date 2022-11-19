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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Auth } from '../../extension/auth';
import { MessageService } from './../../service/MessageService';


export default function AuthenticationTitle() {

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
                        login(values))
                    }
                >
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

async function login(v: any) {
    console.log(v);
    const auth = Auth;
    const res = await auth.signIn(v.userName, v.passWord);
    console.log(res)
    if (!res.success) {
        MessageService.Fails(res.message);
    }
    else
        MessageService.Success("Đăng nhập thành công !");


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
