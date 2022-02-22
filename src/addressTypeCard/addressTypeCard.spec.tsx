import {AddressTypeCard} from "./addressTypeCard";
import {render} from "@testing-library/react";

describe('Address Type Card', () => {
    it('should render', function () {
        render(<AddressTypeCard walletHash={'hash'} />)
    });
})