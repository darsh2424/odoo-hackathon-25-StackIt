import MDEditor from '@uiw/react-md-editor';
import { Box } from '@chakra-ui/react';

export default function MarkdownEditor({ value, onChange }) {
  return (
    <Box data-color-mode="light">
      <MDEditor
        value={value}
        onChange={onChange}
        height={400}
        preview="edit"
        visibleDragbar={false}
      />
    </Box>
  );
}