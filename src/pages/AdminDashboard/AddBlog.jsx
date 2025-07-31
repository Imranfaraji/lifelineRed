import React, { useMemo, useRef, useState } from 'react';

import JoditEditor from 'jodit-react';
import useAxiosSecure from '../../utilitis/Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AddBlog = ({placeholder}) => {
    const editor=useRef(null)
    const [content,setContent]=useState('')

    const axiosSecure=useAxiosSecure()

    const config= useMemo(
        ()=>({
            readonly:false,
            placeholder:placeholder || "Start writing Content..."
        }),
        [placeholder]
    )

    const handleSubmit=e=>{
        e.preventDefault()
        const form=e.target;
        const title=form.title.value;
        const thumbnail=form.thumbnail.value

        const blog={
            title,thumbnail,content
        }
        axiosSecure.post('/blogs',blog).then(res=>{
            if(res.data.insertedId>0){
                toast.success('Blog add to draft')
                form.reset()
                
            }
        })
    }
    return (
        <div className='w-full py-16'>

            <div className='responsive'>

                <h2 className='text-center mb-10 text-4xl font-bold'>Add New Blog</h2>

                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                      <input type="text mb-4" 
                      name='title'
                      placeholder='Enter Blog Title'
                      className='input w-full'
                      required
                      />
                      <input type="url" 
                      name='thumbnail'
                      placeholder=' Thumbnail Url'
                      className='input mb-4 w-full'
                      required
                      />

                      <div className='mb-4'>


                        <JoditEditor ref={editor}
                        value={content}
                        config={config}
                        tabIndex={2}
                        onBlur={(newContent)=>setContent(newContent)}
                        ></JoditEditor>

                      </div>

                      <button type='submit' className='cta'>Submit</button>
                </form>

            </div>
            
        </div>
    );
};

export default AddBlog;