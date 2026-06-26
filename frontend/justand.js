import {create} from 'zustand'

export const useProductContext = async ((set)=>({
    products: [],
    createProduct: async (newProduct)=>{

        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return  { success: false ,  message:"Please Fill In All The Details"}
        }
    }
}))