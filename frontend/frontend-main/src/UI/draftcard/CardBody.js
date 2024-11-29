const CardBody = (props) => {
    return (
      <div className="w-100 flex flex-col justify-center items-center gap-2">
        {props.children}
      </div>
    );
};

export default CardBody;