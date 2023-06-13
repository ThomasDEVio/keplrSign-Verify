import type { SG721Instance } from "../contract";

export type QueryType = (typeof QUERY_TYPES)[number];

export const QUERY_TYPES = [
  "owner_of",
  "approval",
  "approvals",
  "all_operators",
  "num_tokens",
  "contract_info",
  "nft_info",
  "all_nft_info",
  "tokens",
  "tokens_paginated",
  "all_tokens",
  "minter",
  "collection_info",
] as const;

export interface QueryListItem {
  id: QueryType;
  name: string;
  description?: string;
}

export const QUERY_LIST: QueryListItem[] = [
  { id: "owner_of", name: "Owner Of", description: "View current owner of given token" },
  { id: "approval", name: "Approval", description: "View address that has access to given token" },
  { id: "approvals", name: "Approvals", description: "View all approvals of a given token" },
  {
    id: "all_operators",
    name: "All Operators",
    description: "List all the operators that has access all of the owner's tokens",
  },
  { id: "num_tokens", name: "Number of Tokens", description: "View total number of tokens minted" },
  { id: "contract_info", name: "Contract Info", description: "View top-level metadata of contract" },
  { id: "nft_info", name: "NFT Info", description: "View metadata of a given token" },
  { id: "all_nft_info", name: "All NFT Info", description: "View metadata and owner info of a given token" },
  { id: "tokens", name: "Tokens", description: "View all the tokens owned by given address" },
  { id: "tokens_paginated", name: "Tokens paginated", description: "View all the tokens owned by given address" },
  { id: "all_tokens", name: "All Tokens", description: "List all the tokens controlled by the contract" },
  { id: "minter", name: "Minter", description: "View current minter of the contract" },
  { id: "collection_info", name: "Collection Info", description: "View metadata of a given collection" },
];

export interface DispatchQueryProps {
  messages: SG721Instance | undefined;
  type: QueryType;
  tokenId: string;
  address: string;
  paginationKey?: number;
}

export const dispatchQuery = (props: DispatchQueryProps) => {
  const { tokenId, messages, type, address, paginationKey = 0 } = props;
  switch (type) {
    case "owner_of": {
      return messages?.ownerOf(tokenId);
    }
    case "approval": {
      return messages?.approval(tokenId, address);
    }
    case "approvals": {
      return messages?.approvals(tokenId);
    }
    case "all_operators": {
      return messages?.allOperators(address);
    }
    case "num_tokens": {
      return messages?.numTokens();
    }
    case "contract_info": {
      return messages?.contractInfo();
    }
    case "nft_info": {
      return messages?.nftInfo(tokenId);
    }
    case "all_nft_info": {
      return messages?.allNftInfo(tokenId, null);
    }
    case "tokens": {
      return messages?.tokens(address, undefined, 99);
    }
    case "tokens_paginated": {
      // let numberToStart = 0;
      // numberToStart = paginationKey * 30;
      // console.log("paginationKey", paginationKey)
      // console.log("numberToStart", numberToStart)
      return messages?.tokens(address, paginationKey.toString(), 30);
    }
    case "all_tokens": {
      return messages?.allTokens();
    }
    case "minter": {
      return messages?.minter();
    }
    case "collection_info": {
      return messages?.collectionInfo();
    }
    default: {
      throw new Error("unknown query type");
    }
  }
};
