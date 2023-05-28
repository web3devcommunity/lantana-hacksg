import * as _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react';
import { Alchemy, AlchemySettings, AssetTransfersCategory, GetNftMetadataOptions, Network, Nft, NftTokenType } from "alchemy-sdk";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinkIcon from '@mui/icons-material/Link';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SensorsIcon from '@mui/icons-material/Sensors';
import { getExplorerUrl, withIpfsGateway } from '@/libs/lens/utils';
import { ALCHEMY_API_TOKEN_GOERLI, ALCHEMY_API_TOKEN_MUMBAI, ALCHEMY_API_TOKEN_OPTIMISM } from '@/env';
import { NfcSharp } from '@mui/icons-material';
import { Grid } from '@mui/material';

export const getAlchemySettings = (network: string) => {
    if (network === 'optimism') {
        return {
            apiKey: ALCHEMY_API_TOKEN_GOERLI,
            network: Network.ETH_GOERLI
            // network: Network.OPT_GOERLI, // Replace with your network.
        }
    }

    return {
        apiKey: ALCHEMY_API_TOKEN_MUMBAI,
        network: Network.MATIC_MUMBAI
    }
}

export const useAlchemySdk = (network: string) => {

    return useMemo(() => {
        const alchemySettings = getAlchemySettings(network);
        return new Alchemy(alchemySettings).nft;
    }, [network])


}

// TODO by user vs by contract getNftsForContract

export const useNFTMetadata = ({
    contractAddress,
    tokenId,
    tokenType,
    network
}: {
    contractAddress: string;
    tokenId: string;
    tokenType: string;
    network: string;
}) => {
    const [nft, setNft] = useState<Nft | null>(null);
    const sdk = useAlchemySdk(network);
    useEffect(() => {

        const options: GetNftMetadataOptions = {
            tokenType: tokenType as NftTokenType
        }
        sdk.getNftMetadata(contractAddress, tokenId, options)
            .then((nftResults) => {
                if (nftResults) {
                    setNft(nftResults);
                }
            });



    }, [contractAddress, tokenId]);

    return {
        nft
    }

}

export const useNFTsSelected = ({
    contractAddress,
    userAddress,
    network
}: {
    contractAddress: string;
    userAddress?: string;
    network: string;
}) => {
    const sdk = useAlchemySdk(network);
    const [nfts, setNfts] = useState<Nft[]>([]);

    useEffect(() => {
        if (userAddress) {
            sdk.getNftsForOwner(userAddress, {
                contractAddresses: [contractAddress]
            })
                .then((results) => {
                    setNfts(results?.ownedNfts as Nft[]);
                });

        } else {
            sdk.getNftsForContract(contractAddress)
                .then((results) => {
                    setNfts(results.nfts)
                });
        }

    }, [contractAddress, userAddress]);

    return {
        nfts
    }
}


export const NFTList = ({ contractAddress, userAddress, network }: {
    contractAddress: string, userAddress?: string; network: string
}) => {
    const { nfts } = useNFTsSelected({ contractAddress, userAddress, network });

    if (!nfts.length) {
        return <></>
    }

    return <Grid container>
        {
            nfts.map(
                nft => {
                    return (
                        <Grid item key={"nft-" + nft.tokenId} xs={6} md={3} spacing={3}>
                            <NFTCard
                                contractAddress={contractAddress}
                                tokenId={nft?.tokenId}
                                tokenType={nft?.tokenType}
                                network={network}
                            />
                        </Grid>
                    )

                }
            )
        }

    </Grid>
}


export const NFTCard = ({ contractAddress, tokenId, tokenType, network, externalUrl }: {
    contractAddress: string,
    tokenId: string;
    tokenType: string;
    network: string;
    externalUrl?: string;

}) => {
    const { nft } = useNFTMetadata({ contractAddress, tokenId, tokenType, network });

    const [imageSrc, setImageSrc] = useState<string>('')

    // data uri token metadata of hypercert will be Too large for alchemy


    useEffect(() => {
        if (!nft) {
            return;
        }

        const media = nft.media?.length ? nft.media : nft.rawMetadata?.media;
        const imageUrl = media?.[0]?.thumbnail || media?.[0]?.item;

        if (imageUrl) {
            setImageSrc(withIpfsGateway(imageUrl));
        } else if (!media?.length && nft.tokenUri) {
            fetch(nft.tokenUri.gateway).then(res => {
                res.json().then(data => {
                    setImageSrc(data.image)
                })
            })
        }
    }, [nft])


    if (!nft) {
        return <></>
    }

    const { title, description } = nft;

    const explorerUrl = getExplorerUrl(network, contractAddress, tokenId?.toString());

    return <>
        <Card >
            <CardHeader
                title={title}
            />
            <CardMedia
                component="img"
                width="300"
                image={imageSrc}
                alt="NFT image"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon style={{ color: "#07111c" }} />
                </IconButton> */}
                {/* <IconButton aria-label="add to favorites">
                    <SensorsIcon style={{ color: "#07111c" }} />
                </IconButton> */}
                {/* <a href={lensterUrl} target="_blank">
                    <IconButton aria-label="Lenster">
                        <img src="https://testnet.lenster.xyz/logo.svg" />
                    </IconButton>
                </a> */}
                {/* <IconButton aria-label="share">
                        <ShareIcon style={{ color: "#07111c" }} />
                </IconButton> */}
                <a href={explorerUrl} target="_blank">
                    <IconButton style={{ color: "gray !important" }} aria-label="etherscan">
                        <svg className="" fill="#04111D" height="20" viewBox="0 0 293.775 293.671" width="20" xmlns="http://www.w3.org/2000/svg"><g id="etherscan-logo-circle" transform="translate(-219.378 -213.33)"><path d="M280.433,353.152A12.45,12.45,0,0,1,292.941,340.7l20.737.068a12.467,12.467,0,0,1,12.467,12.467v78.414c2.336-.692,5.332-1.43,8.614-2.2a10.389,10.389,0,0,0,8.009-10.11V322.073a12.469,12.469,0,0,1,12.468-12.47h20.778a12.469,12.469,0,0,1,12.467,12.467v90.279s5.2-2.106,10.269-4.245a10.408,10.408,0,0,0,6.353-9.577V290.9a12.466,12.466,0,0,1,12.466-12.467h20.778A12.468,12.468,0,0,1,450.815,290.9v88.625c18.014-13.055,36.271-28.758,50.759-47.639a20.926,20.926,0,0,0,3.185-19.537,146.6,146.6,0,0,0-136.644-99.006c-81.439-1.094-148.744,65.385-148.736,146.834a146.371,146.371,0,0,0,19.5,73.45,18.56,18.56,0,0,0,17.707,9.173c3.931-.346,8.825-.835,14.643-1.518a10.383,10.383,0,0,0,9.209-10.306V353.152" data-name="Path 1" id="Path_1"></path><path d="M244.417,398.641A146.808,146.808,0,0,0,477.589,279.9c0-3.381-.157-6.724-.383-10.049-53.642,80-152.686,117.4-232.79,128.793" data-name="Path 2" id="Path_2" transform="translate(35.564 80.269)"></path></g></svg>
                    </IconButton>
                </a>
                {
                    externalUrl && (
                        <a href={externalUrl} target="_blank">
                            <IconButton style={{ color: "gray !important" }} aria-label="etherscan">
                                <LinkIcon />
                            </IconButton>
                        </a>
                    )

                }




            </CardActions>

        </Card >
    </>

}