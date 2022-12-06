import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin: 0px auto 24px auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 24px;
  cursor: pointer;

  &.answered {
    cursor: default;
  }
`;

export const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const InfoText = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 87%;
      padding: 4px 0px;
      margin: 0;
      color: ${colors.mono.gray6};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.bold};

      &.answered {
        width: 86%;
        color: ${colors.main.normal};
      }
    `;
  }}
`;

export const TimeText = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      padding: 12px 0px 4px 0px;
      margin: 0;
      color: ${colors.mono.gray5};
      font-size: ${fonts.size.base};
      font-weight: ${fonts.weight.light};

      &.answered {
        color: ${colors.main.normal};
      }
    `;
  }}
`;

export const EditText = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      padding: 12px 0px 4px 0px;
      margin: 0;

      cursor: pointer;
      color: ${colors.mono.gray5};
      font-size: ${fonts.size.base};
      font-weight: ${fonts.weight.light};

      &.answered {
        color: ${colors.main.normal};
        font-weight: ${fonts.weight.bold};
      }
    `;
  }}
`;

export const Content = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      padding: 8px 16px;
      margin: 0;

      background-color: ${colors.mono.gray2};

      color: ${colors.mono.gray};
      font-size: ${fonts.size.base};
      font-weight: ${fonts.weight.normal};

      &.answered {
        background-color: ${colors.main.opacity30};
        color: ${colors.main.normal};
      }
    `;
  }}
`;
