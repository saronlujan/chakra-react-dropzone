import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react"

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { Upload } from "./shared/Upload";
import { Upload2 } from "./shared/Upload2";

interface FormType {
    image: string,
    title: string,
}

export default function App() {

    const validation = Yup.object().shape({
        image: Yup.string()
            .required('Field image is required!'),
        title: Yup.string()
            .required('Field title is required!'),
    });

    const {handleSubmit, register, setValue, getValues, setError, clearErrors, watch, control, formState: { errors, isValid, isSubmitting }} = useForm<FormType>({
        mode: 'onChange',
        resolver: yupResolver(validation)
    });

    const values = getValues();
    console.log(values.title);

    const onSubmit: SubmitHandler<FormType> = async (data) => {
        const values = getValues();
        console.log(values.title);
    }

    return (
        <Flex justify="center" align="center" w="100%" h="100vh">
            <Flex direction="column" w="500px" p="5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing="5">  
                        <FormControl isInvalid={!!errors.image}>
                            <Upload field="image" setValue={setValue} error={errors.image} setError={setError} clearErrors={clearErrors} />
                            {/* <Upload2 name="image" setValue={setValue} setError={setError} watch={watch} control={control}/> */}
                            <FormErrorMessage mt="1">{errors.image?.message}</FormErrorMessage>
                        </FormControl>   
                        <FormControl isInvalid={!!errors.title}>
                            <FormLabel>Titulo:</FormLabel>
                            <Input type="text" {...register('title')}/>
                            <FormErrorMessage mt="1">{errors.title?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl display="flex" justifyContent="end">
                            <Button type="submit" colorScheme="green" disabled={!isValid} isLoading={isSubmitting}>
                                Adicionar
                            </Button>
                        </FormControl>
                    </Stack>
                </form>
            </Flex>
        </Flex>
    )
}