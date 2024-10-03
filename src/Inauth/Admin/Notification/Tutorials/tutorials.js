import { ModeEditOutline } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Dropdown from "../../../../Inauth/Dropdown/Dropdown";
import Table from "../../../../Inauth/Table/Table";
import {
  deleteTutorial,
  editTutorial,
  getTutorial,
  uploadTutorial,
} from "../../../../redux/actions/authActions";
import { confirm } from "../../../../redux/actions/confirmActions";

export const Tutorials = () => {
  const dropValue = ["Video"];
  const [title, setTitle] = useState();
  const [url, setURL] = useState();
  const [tutorials, setTutorials] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setID] = useState();
  // const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleClose = () => {
    // setIsEditOpen(false);
  };

  const handleEdit = (item) => {
    if (item) {
      // setIsEditOpen(true);
      setIsEdit(true);
      setTitle(item?.title);
      setURL(item?.url);
      setID(item?.id);
    }
  };

  const handleDelete = async (item) => {
    confirm("Are you sure you want to delete?")
      .then(async (e) => {
        if (item && item?.id) {
          const data = await deleteTutorial({ id: item.id });
          if (data) {
            fetchTutorial();
          }
        }
      })
      .catch((err) => {});
  };

  const resetEdit = () => {
    setIsEdit(false);
    setTitle("");
    setURL("");
    setID("");
  };

  const col = ["Title", "URL", "Upload Type", "Actions"];

  const handleSubmit = async () => {
    if (title && title?.length !== 0 && url && url?.length !== 0) {
      const payload = {
        title,
        url,
        upload_type: "video",
      };

      if (isEdit) {
        payload["id"] = id;
        editTutorial(payload).then(() => {
          fetchTutorial();
        });
      } else {
        uploadTutorial(payload).then(() => {
          fetchTutorial();
        });
      }
    }
  };

  const fetchTutorial = async () => {
    setIsLoading(true);
    resetEdit();
    const data = await getTutorial();
    if (data && data.length !== 0) {
      let newData = [];

      for (let i = 0; i < data.length; i++) {
        const ele = data[i];
        ele["actions"] = [
          {
            type: "edit",
            icon: <ModeEditOutline />,
            onClick: handleEdit,
          },
          { type: "delete", icon: <DeleteIcon />, onClick: handleDelete },
        ];
        newData.push(ele);
      }
      setTutorials(newData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setTutorials([]);
    }
  };

  useEffect(() => {
    fetchTutorial();
  }, []);

  return (
    <>
      <Box className="tabelBox">
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={12}>
            <Box className="selectiondiv-box">
              <Dropdown title={"Upload Type"} val={dropValue} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "auto",
                }}
                className="formItems inputFields space"
              >
                <TextField
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  sx={{ marginRight: "10px" }}
                />
                <TextField
                  placeholder="Enter URL"
                  value={url}
                  onChange={(e) => setURL(e.target.value)}
                  type="text"
                />
              </Box>
              <Box className="selectionDiv bn searchFlex">
                <Button
                  className="download-btn solidButton"
                  sx={{
                    marginLeft: 1,
                    minWidth: "100% !important",
                    width: "100% !important",
                  }}
                  onClick={handleSubmit}
                >
                  SUBMIT
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Table isLoading={isLoading} col={col} rows={tutorials} />
      </Box>

      {/* <Dialog
				open={isEditOpen}
				onClose={handleClose}
				className='commonModal addSymbol-marketwatch'
				fullWidth
			>
				<Box className='modalHeader' sx={{ justifyContent: 'space-between' }}>
					<Typography component={'h4'}>Add Symbol</Typography>
					<Button onClick={handleClose} className='closeModal'>
						<img src={close} alt='' />
					</Button>
				</Box>

				<DialogContent sx={{ padding: '0' }} className='modalBody'>
					<DialogContentText sx={{ padding: '0' }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: 'auto',
							}}
							className='formItems inputFields space'
						>
							<TextField
								placeholder='Enter Title'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								type='text'
								sx={{ marginRight: '10px' }}
							/>
							<TextField
								placeholder='Enter URL'
								value={url}
								onChange={(e) => setURL(e.target.value)}
								type='text'
							/>
						</Box>
					</DialogContentText>
				</DialogContent>
			</Dialog> */}
    </>
  );
};
