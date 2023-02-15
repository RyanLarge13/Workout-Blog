import React, { useCallback, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";

const NewPost = ({ post }) => {
  const [content, setContent] = useState("");
  const [logs, setLogs] = useState([]);

  const appendLog = useCallback(
    (message) => {
      console.log("logs = ", logs);
      const newLogs = [...logs, message];
      setLogs(newLogs);
    },
    [logs, setLogs]
  );

  const config = useMemo(
    () => ({
      readonly: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );

  const onChange = useCallback(
    (newContent) => {
      appendLog(`onChange triggered with ${newContent}`);
    },
    [appendLog]
  );

  const onBlur = useCallback(
    (newContent) => {
      appendLog(`onBlur triggered with ${newContent}`);
      setContent(newContent);
    },
    [appendLog, setContent]
  );

  useEffect(() => {
    console.log("onChange = ", onChange);
  }, [onChange]);

  return (
    <section>
      <JoditEditor
        value={content}
        config={config}
        tabIndex={1}
        onBlur={onBlur}
        onChange={onChange}
      />
    </section>
  );
};

export default NewPost;
