import * as Yup from 'yup'
import {React,useEffect,useState} from 'react'
import { Form,Formik } from 'formik'
import { Button  } from 'semantic-ui-react'
import CustomTextInput from '../../utilities/customForm/CustomTextInput'
import CustomSelectInput from '../../utilities/customForm/CustomSelectInput'
import LanguageService from '../../services/languageService'

export default function CreateRoom() {
    const  [languages,setLanguages] = useState({})

    const initialValues = {title:"",limit:0,level:0}
    let langObject={}
    

    const schema = Yup.object({

        name:Yup.string().required().min(4).max(20),
        limit:Yup.number().required().min(1).max(10),
        level:Yup.number().required().min(1).max(5),
        language:Yup.string().required().min(2).max(2)
    })  


    useEffect(async () => {
        let languageService = new LanguageService()
        

        let langs = await languageService.getLanguages()

        
        langs.data.data.map(lang=>{

            langObject[lang.code] = lang.name
            
        })

        setLanguages(langObject)
        

    }, [])





    function createRoom(){




    }




    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values)=>console.log(values)}
        >   
        
            <Form className="ui form">
                <CustomTextInput className="mb-5" name="name" placeholder="Title"   ></CustomTextInput>
                <CustomSelectInput  className="mb-5" name="language" options={languages} default="Langugage"></CustomSelectInput>
                <CustomSelectInput  className="mb-5" name="level" options={{"1":"Beginner","2":"Elementary","3":"Intermediate","4":"Advanced"}} default="Level"></CustomSelectInput>
                <CustomSelectInput  className="mb-5" name="limit" options={{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10}} default="User Limit"></CustomSelectInput>
                
                <button type="submit" className="btn btn-primary">Create Room</button>
            </Form>

        </Formik>   
    )




}
