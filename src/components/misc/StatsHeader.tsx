import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from "@mui/material";
import useUser from "hooks/useUser";
import { modifyBalance } from "lib/User";
import { FC, useContext, useMemo } from "react";
import { ContactContext } from "../../context/ContactContext";
import { TransactionContext } from "../../context/TransactionContext";
import { getMoneyToPayBack, getPendingMoney } from "../../lib/Statistics";
import LoadValue from "./LoadValue";
import EditIcon from "@mui/icons-material/Edit";
const StatsHeader: FC = () => {
	const { contacts } = useContext(ContactContext);
	const { transactions } = useContext(TransactionContext);

	const user = useUser();

	const pendingMoney = useMemo(() => getPendingMoney(contacts), [contacts]);
	const toPay = useMemo(() => getMoneyToPayBack(contacts), [contacts]);

	const calcNetWorth = () => {
		if (!user?.balance) return;
		if (user.balance <= 0) return;

		return user.balance + pendingMoney - toPay;
	};

	const netWorth = calcNetWorth();

	return (
		<>
			<Grid container spacing={1} p={1}>
				<Grid item xs={4}>
					<Card>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								balance
							</Typography>
							<Typography variant="h5">
								<LoadValue value={user?.balance} />€
							</Typography>
						</CardContent>
					</Card>
					{/* <Typography
					sx={{
						color: "text.secondary",
						textAlign: "center",
						mt: 1,
					}}
				>
					<EditIcon fontSize="small" sx={{ scale: 0.5 }} />
				</Typography> */}
				</Grid>
				<Grid item xs={4}>
					<Card>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								pending
							</Typography>
							<Typography variant="h5">
								<LoadValue value={pendingMoney} />€
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={4}>
					<Card>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								to pay
							</Typography>
							<Typography variant="h5">
								<LoadValue value={toPay} />€
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			{netWorth && (
				<div className="bg-dark-900 p-2 m-2 mt-0 text-center rounded ">
					Net worth: {netWorth.toFixed(2)}€
				</div>
			)}
		</>
	);
};

export default StatsHeader;
