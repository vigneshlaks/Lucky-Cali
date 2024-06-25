import CardWrapper from "./CardWrapper"

const LoginCard = () => {
  return (
    <CardWrapper
    label="Create an Account"
    title="Register"
    backButtonHref="/auth/login"
    backButtonLabel="Already have an account? Login Here."
    >
    </CardWrapper>
  )
}

export default LoginCard;
