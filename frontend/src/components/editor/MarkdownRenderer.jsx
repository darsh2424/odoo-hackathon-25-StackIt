import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Box, Link, Text, Heading, Divider, UnorderedList, OrderedList, ListItem } from '@chakra-ui/react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function MarkdownRenderer({ content }) {
  return (
    <Box className="markdown-content" fontSize="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headings
          h1: ({ node, ...props }) => <Heading as="h1" size="xl" my={4} {...props} />,
          h2: ({ node, ...props }) => <Heading as="h2" size="lg" my={3} {...props} />,
          h3: ({ node, ...props }) => <Heading as="h3" size="md" my={2} {...props} />,
          
          // Paragraph
          p: ({ node, ...props }) => <Text mb={4} lineHeight="tall" {...props} />,
          
          // Links
          a: ({ node, ...props }) => (
            <Link color="blue.500" isExternal {...props} />
          ),
          
          // Lists
          ul: ({ node, ...props }) => <UnorderedList pl={6} mb={4} {...props} />,
          ol: ({ node, ...props }) => <OrderedList pl={6} mb={4} {...props} />,
          li: ({ node, ...props }) => <ListItem pb={1} {...props} />,
          
          // Code blocks
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <Box my={4} borderRadius="md" overflow="hidden">
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  style={undefined} // You can add a custom style here
                  showLineNumbers={false}
                  wrapLines={true}
                  children={String(children).replace(/\n$/, '')}
                  {...props}
                />
              </Box>
            ) : (
              <Box 
                as="code" 
                className={className}
                bg="gray.100"
                px={1}
                py={0.5}
                borderRadius="md"
                fontSize="sm"
                {...props}
              >
                {children}
              </Box>
            );
          },
          
          // Horizontal rule
          hr: ({ node, ...props }) => <Divider my={4} />,
          
          // Blockquote
          blockquote: ({ node, ...props }) => (
            <Box
              borderLeft="4px solid"
              borderColor="gray.200"
              pl={4}
              py={1}
              my={4}
              bg="gray.50"
              {...props}
            />
          ),
          
          // Images
          img: ({ node, ...props }) => (
            <Box 
              as="img" 
              maxW="100%" 
              my={4} 
              borderRadius="md" 
              alt={props.alt || ''} 
              {...props} 
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}