interface Props {
  color: string;
  w: string;
  h: string;
  textColor: string;
  border: string;
  text: string;
  opacity: string;
}

const Button = ({ color, w, h, textColor, border, text, opacity }: Props) => {
  return (
    <button
      className={`w-[${w}] h-[${h}] bg-[${color}]-[${opacity}] text-[${textColor}]`}
    >
      {text}
    </button>
  );
};

export default Button;
