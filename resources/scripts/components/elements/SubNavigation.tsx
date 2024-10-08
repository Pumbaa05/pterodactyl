import styled from 'styled-components/macro';
import tw from 'twin.macro';

const SubNavigation = styled.div`
    ${tw`h-screen bg-neutral-800 shadow-md overflow-x-auto left-0 top-0 sticky`};

    & > div {
        ${tw`flex items-center mx-auto w-full`};

        & > a:first-child {
            ${tw`w-full py-8 flex items-center justify-center text-3xl font-bold`};

            & > img {
                ${tw`text-purple-500 mx-1 2xl:mx-8`};
            }
        }

        & > a:not(:first-child),
        button,
        .navigation-link {
            ${tw`w-full flex flex-row px-4 py-4 justify-center 2xl:justify-start cursor-pointer`}
            &.active {
                ${tw`bg-neutral-900`};
            }
            & > span {
                ${tw`hidden 2xl:flex items-center justify-center ml-4`};
            }
            &:hover {
                ${tw`bg-neutral-900`};
            }
        }
    }
`;

export default SubNavigation;
