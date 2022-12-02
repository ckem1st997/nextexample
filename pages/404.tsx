import { createStyles, Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import Link from 'next/link';
import image from '../public/image.11cd6c19.svg';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    title: {
        fontWeight: 900,
        fontSize: 34,
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    control: {
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
    },

    mobileImage: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    desktopImage: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
}));

export default function NotFoundImage() {
    const { classes } = useStyles();
    return (
        <Container className={classes.root}>
            <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
                <Image src={image} className={classes.mobileImage} />
                <div>
                    <Title className={classes.title}>Something is not right...</Title>
                    <Text color="dimmed" size="lg">
                        Page you are trying to open does not exist. You may have mistyped the address, or the
                        page has been moved to another URL. If you think this is an error contact support.
                    </Text>
                    <Button variant="outline" size="md" mt="xl" className={classes.control}>
                        <Link href="/home">            
                        Get back to home page
                        </Link>
                    </Button>
                </div>
                <Image src={image.src} className={classes.desktopImage} />
            </SimpleGrid>
        </Container>
    );
}

export async function getStaticProps() {
    return {
      props: {}, // will be passed to the page component as props
    }
  }