const CardActions = (props) => {
    return (
      <div className="w-100 flex gap-4">
        {props.children}
      </div>
    );
};

export default CardActions;