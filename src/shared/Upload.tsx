import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { BiImageAdd } from "react-icons/bi";
import { MdClose } from "react-icons/md";

interface UploadProps {
    field: any
    setValue: any
    setError: any
    error: any
    clearErrors: any
}

export const Upload = (props: UploadProps) => {
    const [file, setFile] = useState<any>({});
    const {field, setValue, setError, error, clearErrors} = props;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles: any) => {
            if(acceptedFiles.length === 1){
                const file = acceptedFiles.map((file: any) => Object.assign(file, {
                    key: file.path,
                    preview: URL.createObjectURL(file)
                }));
                setFile(file[0]);
                setValue(field, file[0], {
                    shouldValidate: true,
                });
                clearErrors([field])
            } else {
                setError(field, { message: 'Select only one image!'});
            }
        }
    });

    function handleClear(){
        setFile({});
        setValue(field, '', {
            shouldValidate: true,
        });
    }
    
    return (
        <Flex justify="center" align="center" w="100%" position="relative" cursor="pointer">
            <Flex justify="center" align="center" w="100%" minH="100px" border="1px" borderStyle="solid" borderColor={isDragActive ? 'green.500' : error ? 'red.500' : 'gray.300'} borderRadius="7px" overflow="hidden" {...getRootProps()} position="relative" transition="0.3s" padding="5px" bg="gray.50" _hover={{
                borderColor: 'gray.400'
            }}>
                {file.path ? (
                    <Flex w="100%" h="100%" justify="center" align="center" position="absolute" top="0px" left="0px">
                        <Flex w="30px" h="30px" justify="center" align="center" background="rgba(0, 0, 0, 0.5)" borderRadius="100%" position="absolute" top="15px" right="15px" transition="0.3s" cursor="pointer" onClick={handleClear} _hover={{
                            background: 'rgba(0, 0, 0, 1);'
                        }}>
                            <Icon as={MdClose} color="#fff" fontSize="20px" />
                        </Flex>
                    </Flex>
                ) : (
                    isDragActive ? (
                        <Flex align="center" position="absolute" mt="0" mb="0" mr="0" ml="0" color="gray.400">
                            <Icon as={BiImageAdd} fontSize="22px" mr="10px"/>
                            <Text fontSize="12px">Pronto, solte a image para visualizar.</Text>
                        </Flex>
                    ) : (
                        <Flex align="center" position="absolute" mt="0" mb="0" mr="0" ml="0" color="gray.400">
                            <input {...getInputProps()} />
                            <Icon as={BiImageAdd} fontSize="22px" mr="10px"/>
                            <Text fontSize="12px">Arraste ou clique para selecionar.</Text>
                        </Flex>
                    )
                )}
                <Flex>
                    {file && (
                        <Flex>
                            <Image key={file.key} src={file.preview} w="100%" borderRadius="7px" />
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};