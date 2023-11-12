import { ThirdwebSDK, detectFeatures } from "@thirdweb-dev/sdk";
import {
  contractAddress,
  erc1155TokenId,
  minimumBalance,
} from "@/consts/yourDetails";
import { BigNumber } from "ethers";
export default async function checkBalance(sdk: ThirdwebSDK, address: string) {
  const contract = await sdk.getContract(
    contractAddress // replace this with your contract address
  );

  let balance: BigNumber;

  const features = detectFeatures(contract.abi);

  if (features?.ERC1155?.enabled) {
    balance = await contract.erc1155.balanceOf(address, erc1155TokenId);
  } else if (features?.ERC721?.enabled) {
    balance = await contract.erc721.balanceOf(address);
  } else if (features?.ERC20?.enabled) {
    balance = (await contract.erc20.balanceOf(address)).value;
    return balance.gte((minimumBalance * 1e18).toString());
  }

  // gte = greater than or equal to
  return balance.gte(minimumBalance);
}
