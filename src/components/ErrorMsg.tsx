interface ErrorMsgProps {
  message: string;
}

function ErrorMsg({ message }: ErrorMsgProps) {
  return <p className="error">We are sorry, {message}</p>;
}

export default ErrorMsg;
