// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor() ERC20("Mock Token", "MT") {
        _mint(msg.sender, 100 * 10**18);
    }
}

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();
        new MockToken();
        vm.stopBroadcast();
    }
}
