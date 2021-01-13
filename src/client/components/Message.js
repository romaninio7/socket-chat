import React, { useEffect, useState } from "react";
import LinkPreview from "@ashwamegh/react-link-preview";
import styled from "styled-components";

import "@ashwamegh/react-link-preview/dist/index.css";

const StyledMessage = styled.div`
  display: flex;
  padding: 0 5%;
  margin-top: 3px;
`;

const RightMessage = styled(StyledMessage)`
  justify-content: flex-end;
`;

const LeftMessage = styled(StyledMessage)`
  justify-content: flex-start;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  color: #828282;
  letter-spacing: 0.3px;
  padding: 0 12px;
`;

const Box = styled.div`
  background: #f3f3f3;
  border-radius: 20px;
  padding: 5px 20px;
  color: white;
  display: inline-block;
  max-width: 80%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
  margin: 5px 0;
`;

const BoxLeft = styled(Box)`
  background: rgb(251, 195, 119, 28%);
  color: #444;
`;

const BoxRight = styled(Box)`
  background: #f3f3f3;
  color: #353535;
`;

const Message = ({ message: { user, text }, name }) => {
  const [urlTxt, setUrlTxt] = useState("");

  console.log(name, "name");
  console.log(user, "user");
  useEffect(() => {
    const testUrl = text.match(/(https?:\/\/[^\s]+)/g);
    const onlyUrl =
      testUrl && Array.isArray(testUrl) && testUrl.length && testUrl[0];
    setUrlTxt(onlyUrl);
  }, [text]);

  return user === name.trim().toLowerCase() ? (
    <RightMessage>
      <Author>#{name}</Author>
      <BoxLeft>
        {text}
        {urlTxt && (
          <a href={urlTxt} target="_blank">
            <LinkPreview url={urlTxt} />
          </a>
        )}
      </BoxLeft>
    </RightMessage>
  ) : (
    <LeftMessage>
      <BoxRight>
        {text}
        {urlTxt && (
          <a href={urlTxt} target="_blank">
            <LinkPreview url={urlTxt} />
          </a>
        )}
      </BoxRight>
      <Author>#{user}</Author>
    </LeftMessage>
  );
};

export default Message;
