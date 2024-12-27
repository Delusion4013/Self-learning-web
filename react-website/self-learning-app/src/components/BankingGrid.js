import FlexGrid from "./FlexGrid"

/**
 * Defines the banking layout for the website, with some default parameters in case a layout has not yet been received.
 * @param {*} props 
 * @param {*} props.layout 
 * @returns A FlexGrid defining the banking layout for the website.
 */
export default function BankingGrid(props) {
	
	const journeys = {
		incognito: ["sign-in", "sign-out"],
		helper: ["sign-in", "help"],
		balancer: ["sign-in", "my-account", "transactions", "sign-out"],
		payer: ["sign-in", "pay", "select-card-type", "select-account", "select-amount", "authorise", "send", "sign-out"],
		transferer: ["sign-in", "transfer", "select-account", "select-amount", "authorise", "send", "sign-out"],
		applier: ["sign-in", "apply", "apply-select", "sign-out"],
		freezer: ["sign-in", "my-account", "freeze", "freeze-select", "authorise", "sign-out"],
		multitasker: ["sign-in", "my-account", "transactions", "pay", "transfer", "apply", "sign-out"]
	}

	const defaultSize = {w:40, h:40}
	let gridParams = defaultSize;
	let elements = {};
	if (props.layout && props.layout.gridParams) gridParams = props.layout.gridParams;
	if (props.layout && props.layout.elements) elements = props.layout.elements;
	return (
		<FlexGrid
			gridParams={gridParams}
			elements={elements} >
			<button startTimer={true} id="sign-in" className="sign" x="2" y="2" w="3" h="2">
				Sign in
			</button>

			<button id="sign-out" end="true" className="sign" x="5" y="2" w="3" h="2">
				Sign out
			</button>

			<button id="help" className="sign" x="37" y="2" w="3" h="2">
				Help
			</button>

			<button id="my-account" className="mainBut" className="mains" x="6" y="7" w="4" h="3">
				My Account
			</button>

			<button id="pay" className="mainBut" x="15" y="7" w="4" h="3">
				Pay
			</button>

			<button id="transfer" className="mainBut" x="23" y="7" w="4" h="3">
				Transfer
			</button>

			<button id="apply" className="mainBut" x="32" y="7" w="4" h="3">
				Apply
			</button>

			<button id="transactions" x="6" y="15" w="13" h="14">
				Transactions
			</button>

			<select id="select-card-type" name="card-type" className="fillerBut" x="22" y="15" w="4" h="2">
				<option value="default" selected disabled hidden>Card Type</option>
				<option value="debit">Debit</option>
				<option value="credit">Credit</option>
			</select>

			<select id="account-select" name="account-select" className="fillerBut" x="27" y="15" w="4" h="2">
				<option value="default" selected disabled hidden>Select Account</option>
				<option value="savers-account">Saver Account</option>
				<option value="low-interest">Low Interest Account</option>
			</select>

			<select id="pay-select" name="Pay" className="fillerBut" x="32" y="15" w="4" h="2">
				<option value="default" selected disabled hidden>Payee</option>
				<option value="payee1">Tony Stark</option>
				<option value="payee2">Thor Odinson</option>
			</select>

			<button id="freeze" className="fillerBut" x="32" y="23" w="4" h="2">
				Freeze
			</button>

			<button id="authorise" className="fillerBut" x="22" y="23" w="4" h="2">
				Authorise
			</button>

			<button id="send" className="fillerBut" x="27" y="23" w="4" h="2">
				Send
			</button>

			<input id="select-amount" value="Select Amount" x="24" y="19" w="9" h="2">
			</input>
		</FlexGrid >
	)
}