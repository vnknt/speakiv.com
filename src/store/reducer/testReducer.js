import testItem from "../initialValues/testItem";

const counter=(state=testItem,action)=>{
    switch (action.type) {
        case 'INCREMENT':
            return state+1;
    }
};

