import * as style from "./ToolbarTemplate.style";

import useToolbar from "@/hooks/useToolbar";

interface ToolbarTemplateProps {
  title: string;
  subtitle: string;
}

const ToolbarTemplate = ({ title, subtitle }: ToolbarTemplateProps) => {
  const { cancelToolbar } = useToolbar();

  return (
    <style.Wrapper onClick={cancelToolbar}>
      <style.SideDecoration />
      <style.TextBox>
        <style.Title>{title}</style.Title>
        <style.SubTitle>{subtitle}</style.SubTitle>
      </style.TextBox>
    </style.Wrapper>
  );
};

export default ToolbarTemplate;
