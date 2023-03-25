import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/layout';

const testCard = {
    front: '{{c1::**Alkylating agents**}}, such as {{c2::**cyclophosphamide**}}, transfer **alkyl groups to DNA**, resulting in cell death. This drug also provides {{c2::immune suppression}}, which can be utilized to {{c1::prevent post-transplant organ rejection}}.',
    back: '**Cyclophosphamide** is a **prodrug** metabolized to its active form by CYP450 enzymes.',
};

function formatString(str: string, format: 'bold' | 'italic' | 'underline') {
    switch (format) {
        case 'bold':
            return <strong>{str}</strong>;
        case 'italic':
            return <em>{str}</em>;
        case 'underline':
            return <span style={{ textDecoration: 'underline' }}>{str}</span>;
        default:
            return <span>{str}</span>;
    }
}

const cardReg = /{{(.*?)}}/d;
const test = testCard.front.split(cardReg);
console.log(test);

export function Flashcard() {
    return (
        <Flex>
            <span>Front</span>
        </Flex>
    );
}
