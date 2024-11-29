import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../UI/form/TextInput';
import FormInputError from '../../UI/form/FormInputError';
import TextAreaInput from '../../UI/form/TextAreaInput';
import { useNavigate } from "react-router-dom";


const UpdateDraftForm = ({ selectedDraft, onSubmit }) => {
  const navigate = useNavigate();

    const { register, handleSubmit, formState, setValue, reset , getValues} = useForm();
    const [successMessage, setSuccessMessage] = useState('');
  
    useEffect(() => {
      if (selectedDraft) {

        console.log('Fetched Draft Data:', selectedDraft);
  

        Object.keys(selectedDraft).forEach((field) => {
          setValue(field, selectedDraft[field]);
          
        });
      }
    }, [selectedDraft, setValue]);


    const draftHandler = async () => {
      try {
        if (!selectedDraft) {
          console.log('Selected Draft is null.');
          return;
        }
    

        const formData = getValues();
        console.log(formData);
        const response = await fetch(
          "http://localhost:3001/drafts/updateDraft?id=" + selectedDraft._id,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );
    
        const data = await response.json();
    
        if (!response.ok) {
          throw Error(data.error);
        }
    
        console.log(data);
    
        reset();
    
        setSuccessMessage('Draft updated successfully');
        navigate("/drafts")

    
        if (onSubmit && data.updatedDraft) {
          onSubmit(data.updatedDraft);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
  
  return (
    <form
      className="justify-center flex flex-col p-10 gap-5 bg-gray-800 w-fit"
      onSubmit ={handleSubmit(draftHandler)}
    >
      <TextAreaInput
        label="Description"
        name="description"
        register={register}
        validation={{ required: true }}
        disabled 
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
        className="bg-white rounded-x1 my-4 py-2 px-8 self-center" onClick ={draftHandler}
      >
        Update Draft
      </button>
    </form>
  );
};

export default UpdateDraftForm;