const ButtonComponent = ({
  children,
  className,
  onClick,
  disabled,
  type,
  isLoading,
}: any) => {
  // console.log(props);
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {isLoading ? (
        <div className="flex justify-center">
          <span className="h-5 w-5 block rounded-full border-4 border-blue-400 border-t-white animate-spin"></span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonComponent;
