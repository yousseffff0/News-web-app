const FormInputError = (props) =>{
    return (
        <p className="bg-red-800 text-white font-bold rounded-1g min-w-[250px] p-2">
            {props.children}
        </p>
    );
};

export default FormInputError;