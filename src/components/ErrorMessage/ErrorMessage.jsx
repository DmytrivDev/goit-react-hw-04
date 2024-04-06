import css from "./ErrorMessage.module.scss";

function ErrorMessage() {
  return (
    <div className={css.error}>Oh no, there is an error. Try soon again</div>
  );
}

export default ErrorMessage;
