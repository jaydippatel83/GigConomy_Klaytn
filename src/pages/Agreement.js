import { Card } from "@mui/material";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";
import TableView from "src/components/agreements/TableView";
import Iconify from "src/components/Iconify";
import { Web3Context } from "src/context/Web3Context";
import { AgreementContractAbi, AgreementAddress } from "src/contracts/config";
import CreateAgreementModal from "src/modal/CreateAgreementModal";
import { BlogPostsSort } from "src/sections/@dashboard/blog";
import Page from "../components/Page";
import Web3 from "web3";
import { Biconomy } from "@biconomy/mexa";

function Agreement() {
  const { Moralis, account, user } = useMoralis();
  const web3Context = React.useContext(Web3Context);
  const { connectWallet, web3Auth, address } = web3Context;

  const [status, setStatus] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [contract, setContract] = React.useState();
  const [isUpdate, setIsUpdate] = React.useState(false);
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const createAgreement = async (data) => { 
    setLoading(true); 

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const agreementContract = new ethers.Contract(
      AgreementAddress,
      AgreementContractAbi,
      signer
    );

    let txn;

    try {
      const formattedPrice = ethers.utils.parseEther(data.price.toString());
      txn = await agreementContract.agreementCreate(
        data.buyerAddress,
        data.sellerAddress,
        formattedPrice,
        data.stakePercentBuyer.toString(),
        data.stakePercentSeller.toString(),
        data.title,
        data.description
      );
      await txn.wait();

      console.log(txn, "transaction");
      toast.success("success");
      setLoading(false);
      handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("error");
    }
  };

  return (
    <Page title="Agreement |  GigConomy">
      <CreateAgreementModal
        submitForm={createAgreement}
        open={handleClickOpen}
        close={handleClose}
        op={open}
        acc={address}
        loading={loading}
      />
      <Container pl={0} pr={0}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Agreements
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Agreement
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="end">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-required-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="progress">In Progress</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack>
          <Card>
            {/* <AgreementView currentAccount={address} /> */}
            <TableView currentAccount={address} />
          </Card>
        </Stack>
      </Container>
    </Page>
  );
}

export default Agreement;
