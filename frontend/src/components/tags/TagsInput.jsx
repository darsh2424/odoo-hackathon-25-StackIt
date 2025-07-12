import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Input, 
  Tag, 
  TagLabel, 
  TagCloseButton, 
  Wrap, 
  WrapItem,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  List,
  ListItem,
  useToast
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

export default function TagsInput({ selectedTags, onChange }) {
  const [inputValue, setInputValue] = useState('');
  const [availableTags, setAvailableTags] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef(null);
  const toast = useToast();

  const { data: allTags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => api.getTags(),
  });

  useEffect(() => {
    if (allTags) {
      setAvailableTags(
        allTags.filter(
          tag => !selectedTags.includes(tag.name) && 
          tag.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  }, [inputValue, selectedTags, allTags]);

  const handleAddTag = (tag) => {
    if (selectedTags.length >= 5) {
      toast({
        title: 'Maximum tags reached',
        description: 'You can only add up to 5 tags',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    if (!selectedTags.includes(tag)) {
      onChange([...selectedTags, tag]);
    }
    setInputValue('');
    onClose();
  };

  const handleRemoveTag = (tagToRemove) => {
    onChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 0) {
      onOpen();
    } else {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() && availableTags.length === 0) {
      e.preventDefault();
      handleAddTag(inputValue.trim().toLowerCase());
    }
  };

  return (
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search or add tags..."
          onFocus={() => inputValue.length > 0 && onOpen()}
        />
      </InputGroup>

      <Popover
        isOpen={isOpen && availableTags.length > 0}
        onClose={onClose}
        initialFocusRef={inputRef}
        matchWidth={true}
      >
        <PopoverTrigger>
          <Box w="100%" />
        </PopoverTrigger>
        <PopoverContent w="100%">
          <PopoverBody p={0}>
            <List maxH="200px" overflowY="auto">
              {availableTags.map((tag) => (
                <ListItem
                  key={tag.name}
                  p={2}
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() => handleAddTag(tag.name)}
                >
                  <Flex justify="space-between" align="center">
                    <Text>{tag.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {tag.questionsCount} questions
                    </Text>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      {selectedTags.length > 0 && (
        <Wrap mt={3} spacing={2}>
          {selectedTags.map((tag) => (
            <WrapItem key={tag}>
              <Tag
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveTag(tag)} />
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Box>
  );
}