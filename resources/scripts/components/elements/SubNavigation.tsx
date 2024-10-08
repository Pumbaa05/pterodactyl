import styled from 'styled-components/macro';
import tw from 'twin.macro';

const SubNavigation = styled.div`
    ${tw`h-full bg-neutral-900 shadow-md overflow-x-auto left-0`};

    & > div {
        ${tw`flex items-center mx-auto 2xl:max-w-[240px] max-w-[60px]`};

        & > a:not(:first-child) {
            ${tw`w-full flex flex-row px-4 py-4 justify-center 2xl:justify-start`}
            &.active {
                ${tw`bg-neutral-800`};
            }
            & > span {
                ${tw`hidden 2xl:flex items-center justify-center ml-4`};
            }
            &:hover {
                ${tw`bg-neutral-800`};
        }
    }
`;

export default SubNavigation;
