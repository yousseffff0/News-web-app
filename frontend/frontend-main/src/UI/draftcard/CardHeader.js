const CardHeader = (props) => {
    return (
      <div className="w-100 flex items-center justify-center bg-gradient-to-r from-white to-grey-500 w-full p-2 rounded-t-md">
        {props.children}
      </div>
    );
};

export default CardHeader;