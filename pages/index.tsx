import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	function populate(percent: boolean) {
		console.log("populating " + percent);
		const items = [];

		for (let i = 7; i <= 60; i++)
			items.push(<RDamage hp={i * 100} key={i} percent={percent} />);
		return items;
	}
	console.log("rendering");
	const [items, setItems] = useState(populate(false));

	return (
		<main className="bg-slate-950">
			<div className="flex items-center flex-col justify-center p-6 ">
				<p className="font-bold text-6xl">
					{" "}
					Garen R damage calculator{" "}
				</p>
				<div className="flex items-center justify-center mt-5 space-x-4">
					<button
						className="btn btn-square"
						onClick={() => {
							return setItems(populate(false));
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<p>HP at which it executes</p>
					<button
						className="btn btn-square"
						onClick={() => {
							 setItems(populate(true));
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					<p>Percentage HP at which executes</p>
				</div>
			</div>


			<div className={`md:p-14 p-6  ${inter.className}`}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">{items}</div>
			</div>
      <footer className="footer p-10 bg-neutral text-neutral-content">
  <div className="flex flex-row space-x-8">
    <a href="https://github.com/dev-ardi/garen-r-damage" className="footer-title">Contribute to this page</a> 
    <a href="https://twitter.com/dev_ardi" className="footer-title fill-current">Twitter
    <img src="/twitter.png" className="inline-block w-4 h-4 ml-2" />
    </a>
    <a href="https://dev.to/devardi" className="footer-title fill-current">My blog</a>
    <a href="mailto:ardi@ardi.dev" className="footer-title fill-current">Contact me</a>
  </div>

</footer>
		</main>
	);
}

function RDamage({ hp, percent }: { hp: number; percent: boolean }) {
	const func = percent ? execPercent : execHp;

	return (
		<div className="grid grid-cols-4 text-black gap-1  bg-gray-800 rounded-md">
			<h2 className="flex items-center justify-center  md:text-3xl text-2xl font-bold text-white  rounded-lg">
				{hp}
			</h2>
			<h3 className="flex items-center justify-center p-1 text-2xl bg-green-400 ">
				{func(hp, 1)}
			</h3>
			<h3 className="flex items-center justify-center p-2 text-2xl bg-yellow-400 ">
				{func(hp, 2)}
			</h3>
			<h3 className="flex items-center justify-center p-1 text-2xl bg-red-400 rounded-r-lg">
				{func(hp, 3)}
			</h3>
		</div>
	);
}

const base = [150, 300, 450];
const scaling = [0.25, 0.3, 0.35];

function execHp(max: number, lvl: number): number {
	if (lvl < 1 || lvl > 3) {
		throw new Error("Invalid level. Level must be between 1 and 3.");
	}
	lvl--;
	const percent = scaling[lvl];
	const base_dmg = base[lvl];
	return Math.round((max * percent + base_dmg) / (1 + percent));
}

function execPercent(hp: number, lvl: number): string {
	return Math.round((execHp(hp, lvl) / hp) * 100) + "%";
}
