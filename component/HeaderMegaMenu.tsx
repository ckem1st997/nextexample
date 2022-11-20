import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    ActionIcon,
    useMantineColorScheme,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure, useFullscreen, useNetwork, useScrollLock } from '@mantine/hooks';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconLock,
    IconLockOpen,
    IconSun,
    IconMoonStars,
} from '@tabler/icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ButtonToggle } from './ButtonToggle';
const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: 42,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: -theme.spacing.md,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

const mockdata = [
    {
        icon: IconCode,
        title: 'Open source',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Free for everyone',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Documentation',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Security',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Analytics',
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];

export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <div>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));
    const { toggle, fullscreen } = useFullscreen();
    const [scrollLocked, setScrollLocked] = useScrollLock();
    const networkStatus = useNetwork();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    return (
        <Box pb={120}>
            <Header height={60} px="md">
            <div >
        <p
          
        >
          {!session && (
            <>
              <span >
                You are not signed in
              </span>
              <Link
                href="/api/auth/signin"
               
                onClick={(e:any) => {
                  e.preventDefault()
                  signIn()
                }}
                className={classes.link}
              >
                Sign in
              </Link>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                
                />
              )}
              <span >
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <Button
                // href="/api/auth/signout"
               
                onClick={(e:any) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </Button>
            </>
          )}
        </p>
      </div>
                <Group position="apart" sx={{ height: '100%' }}>
                    <MantineLogo size={30} />
                    <ButtonToggle />
                    <ActionIcon
                        variant="outline"
                        color={dark ? 'yellow' : 'blue'}
                        onClick={() => toggleColorScheme()}
                        title="Toggle color scheme"
                    >
                        {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                    </ActionIcon>
                    <Link href="/home" className={classes.link}>
                        Home
                    </Link>
                    <Link href="/home/about" className={classes.link}>
                        about
                    </Link>
                    <Link href="/home/service" className={classes.link}>
                        service
                    </Link>
                    <Link href="/home/staticpages" className={classes.link}>
                        staticpages
                    </Link>
                    <Link href="/auth/login" className={classes.link}>
                        Login
                    </Link>
                    {/* <Text size="sm" color={networkStatus.online ? 'teal' : 'red'}>
                        {networkStatus.online ? 'Online' : 'Offline'}
                    </Text> */}
                    {/* <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
                        {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    </Button>
                    <Button
                        onClick={() => setScrollLocked((c) => !c)}
                        variant="outline"
                        leftIcon={scrollLocked ? <IconLock size={16} /> : <IconLockOpen size={16} />}
                    >
                        {scrollLocked ? 'Unlock scroll' : 'Lock scroll'}
                    </Button> */}


                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
            </Drawer>
        </Box>
    );
}