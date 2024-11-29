import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../UI/form/TextInput';
import FormInputError from '../../UI/form/FormInputError';
import TextAreaInput from '../../UI/form/TextAreaInput';
import { useNavigate } from 'react-router-dom';

const AddArticleForm = (props) => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState('');

  const submitHandler = async (formData) => {
    try {
      const response = await fetch('http://localhost:3001/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw Error(data.error);
      }

      console.log(data);

      reset();

      setSuccessMessage('Article added successfully');
      navigate("/journalistArticles")
    } catch (err) {
      console.log(err.message);
    }
  };

  const saveHandler = async (formData) => {
    try {
      const response = await fetch('http://localhost:3001/drafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw Error(data.error);
      }

      console.log(data);

      reset();

      setSuccessMessage('Draft added successfully');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form
      className="justify-center flex flex-col p-10 gap-5 bg-gray-800 w-fit"
      onSubmit={handleSubmit(submitHandler)}
    >
      <TextAreaInput
        label="Description"
        name="description"
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.description && (
        <FormInputError>Description must not be empty</FormInputError>
      )}

      <TextInput
        label="Publish Date"
        type="text"
        name="publishdate"
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.publishdate && (
        <FormInputError>Publish date must not be empty</FormInputError>
      )}

      <TextInput
        label="Keyword"
        type="text"
        name="keyword"
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.keyword && (
        <FormInputError>Keyword must not be empty</FormInputError>
      )}

      <TextInput
        label="Image URL"
        type="text"
        name="imgurl" 
        register={register}
        validation={{ required: true }}
      />
      
      {successMessage && (
        <div className="text-green-500">{successMessage}</div>
      )}

      <button
        type="submit"
        className="bg-white rounded-x1 my-4 py-2 px-8 self-center"
      >
        Add Article
      </button>
      <button
        type="button"
        onClick={handleSubmit(saveHandler)}
        className="bg-white rounded-x1 my-4 py-2 px-8 self-center"
      >
        Add Draft
      </button>
    </form>
  );
};

export default AddArticleForm;