import { useState } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Card,
  IconButton,
} from "@mui/material";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
import "react-quill/dist/quill.snow.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CreateTournament() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Call of Duty Tournament 2024",
    type: "Kill Race",
    game: "COD",
    platform: "PC",
    gameMode: "Battle Royale",
    teamSize: "Squad",
    date: "2024-02-01",
    time: "21:00",
    entryFee: "50",
    category: "Cash",
    restrictions: "Platform-Specific",
    hasLimit: "yes",
    limit: "100",
    description:
      "<p>Join our exciting Call of Duty tournament with amazing prizes!</p>",
    attributes: "Featured",
    totalPrizePool: "1000",
    winnerCount: 3,
    prizeSplit: [],
    paymentMethod: "stripe",
    images: [],
    status: "Registration Open",
  });

  const [prizeDistribution, setPrizeDistribution] = useState([]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files
      .filter((file) =>
        ["image/svg+xml", "image/png", "image/jpeg", "image/gif"].includes(
          file.type
        )
      )
      .slice(0, 5);

    const newImages = await Promise.all(
      validFiles.map(async (file) => {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
        return {
          url: base64,
          file,
        };
      })
    );

    console.log(newImages);

    setFormData({ ...formData, images: [...formData.images, ...newImages] });
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const calculatePrizeDistribution = () => {
    const totalPrize = parseFloat(formData.totalPrizePool);
    if (!totalPrize || formData.winnerCount < 1) return;

    const distribution = [];
    for (let i = 0; i < formData.winnerCount; i++) {
      const percentage = i === 0 ? 50 : i === 1 ? 30 : 20;
      distribution[i] = (totalPrize * percentage) / 100;
    }
    setPrizeDistribution(distribution);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/tournaments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create tournament");
      }

      if (data.success) {
        router.push("/admin/tournaments");
      } else {
        throw new Error(data.message || "Failed to create tournament");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error creating tournament: Network or server error");
    }
  };

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 2 }}>
        <Breadcrumb listClassName="mb-3">
          <BreadcrumbItem href="/admin/tournaments">
            Tournament Management
          </BreadcrumbItem>
          <BreadcrumbItem active>Create New Tournament</BreadcrumbItem>
        </Breadcrumb>

        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
          Create New Tournament
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4, color: "text.secondary" }}>
          Create your new tournament here.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tournament Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tournament Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Tournament Type"
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <MenuItem value="Kill Race">Kill Race</MenuItem>
                  <MenuItem value="Battle Royale">Battle Royale</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Game</InputLabel>
                <Select
                  value={formData.game}
                  label="Select Game"
                  onChange={(e) =>
                    setFormData({ ...formData, game: e.target.value })
                  }
                >
                  <MenuItem value="COD">Call of Duty</MenuItem>
                  <MenuItem value="Fortnite">Fortnite</MenuItem>
                  <MenuItem value="CS">Counter-Strike</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Game Mode</InputLabel>
                <Select
                  value={formData.gameMode}
                  label="Game Mode"
                  onChange={(e) =>
                    setFormData({ ...formData, gameMode: e.target.value })
                  }
                >
                  <MenuItem value="Battle Royale">Battle Royale</MenuItem>
                  <MenuItem value="Team Deathmatch">Team Deathmatch</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Team Size</InputLabel>
                <Select
                  value={formData.teamSize}
                  label="Team Size"
                  onChange={(e) =>
                    setFormData({ ...formData, teamSize: e.target.value })
                  }
                >
                  <MenuItem value="Solo">Solo</MenuItem>
                  <MenuItem value="Duo">Duo</MenuItem>
                  <MenuItem value="Squad">Squad</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Platform</InputLabel>
                <Select
                  value={formData.platform}
                  label="Platform"
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                >
                  <MenuItem value="Xbox">Xbox</MenuItem>
                  <MenuItem value="PC">PC</MenuItem>
                  <MenuItem value="PlayStation">PlayStation</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Free">Free</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Restrictions</InputLabel>
                <Select
                  value={formData.restrictions}
                  label="Restrictions"
                  onChange={(e) =>
                    setFormData({ ...formData, restrictions: e.target.value })
                  }
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Platform-Specific">
                    Platform-Specific
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <FormLabel>Tournament Limit</FormLabel>
                <RadioGroup
                  row
                  value={formData.hasLimit}
                  onChange={(e) =>
                    setFormData({ ...formData, hasLimit: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {formData.hasLimit === "yes" && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Limit"
                  type="number"
                  value={formData.limit}
                  onChange={(e) =>
                    setFormData({ ...formData, limit: e.target.value })
                  }
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <FormControl>
                <FormLabel>Payment Method</FormLabel>
                <RadioGroup
                  row
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="stripe"
                    control={<Radio />}
                    label="Stripe"
                  />
                  <FormControlLabel
                    value="axiom"
                    control={<Radio />}
                    label="Axiom Wallet (Balance: $100)"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  border: "2px dashed #ccc",
                  p: 3,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept=".svg,.png,.jpg,.gif"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <label htmlFor="image-upload">
                  <Button
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    variant="contained"
                  >
                    Upload Images
                  </Button>
                </label>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Supported formats: SVG, PNG, JPG, GIF (max: 800x400px)
                </Typography>
              </Box>
            </Grid>

            {formData.images.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {formData.images.map((image, index) => (
                    <Card key={index} sx={{ position: "relative", width: 200 }}>
                      <img
                        src={image.url}
                        alt=""
                        style={{ width: "100%", height: "auto" }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "white",
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Card>
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total Prize Pool"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                value={formData.totalPrizePool}
                onChange={(e) =>
                  setFormData({ ...formData, totalPrizePool: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Number of Winners"
                type="number"
                value={formData.winnerCount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    winnerCount: parseInt(e.target.value),
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" onClick={calculatePrizeDistribution}>
                Calculate Prize Distribution
              </Button>
            </Grid>

            {prizeDistribution.map((prize, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TextField
                  fullWidth
                  label={`${index + 1}${
                    index === 0 ? "st" : index === 1 ? "nd" : "rd"
                  } Prize`}
                  value={prize.toFixed(2)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tournament Attributes</InputLabel>
                <Select
                  value={formData.attributes}
                  label="Tournament Attributes"
                  onChange={(e) =>
                    setFormData({ ...formData, attributes: e.target.value })
                  }
                >
                  <MenuItem value="Featured">Featured</MenuItem>
                  <MenuItem value="Regular">Regular</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
                style={{ height: "200px", marginBottom: "50px" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/admin/tournaments")}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "#F8B602",
                    color: "#000",
                    "&:hover": { bgcolor: "#e6a800" },
                  }}
                >
                  Publish Tournament
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AdminDashboardLayout>
  );
}
