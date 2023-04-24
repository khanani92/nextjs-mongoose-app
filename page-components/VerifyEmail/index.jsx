import { ButtonLink } from '../../shared/components/Button';
import { Container, Spacer, Wrapper } from '../../shared/components/Layout';
import { Text } from '../../shared/components/Text';
import Link from 'next/link';
import styles from './VerifyEmail.module.css';

export const VerifyEmail = ({ valid }) => {
  return (
    <Wrapper className={styles.root}>
      <Container column alignItems="center">
        <Text
          className={styles.text}
          color={valid ? 'success-light' : 'secondary'}
        >
          {valid
            ? 'Thank you for verifying your email address. You may close this page.'
            : 'It looks like you may have clicked on an invalid link. Please close this window and try again.'}
        </Text>
        <Spacer size={4} axis="vertical" />
        <Link href="/" passHref>
          <ButtonLink variant="ghost" type="success" size="large">
            Go back home
          </ButtonLink>
        </Link>
      </Container>
    </Wrapper>
  );
};
