interface ErrorMsgProps {
  message: string;
}

function ErrorMsg({ message }: ErrorMsgProps) {
  return <p className="error">❌{message}❌</p>;
}

export default ErrorMsg;
