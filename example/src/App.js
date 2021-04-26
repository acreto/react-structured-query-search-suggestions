import React, { Component } from "react";

import ReactStructuredQuerySearch from "react-structured-query-search-suggestions";
import "react-structured-query-search-suggestions/dist/index.css";

export default class App extends Component {
	constructor(props) {
		super(props);
		// NOTE: The operator will seen to UI only if props isAllowOperator={true}
		this.state={
			options :[
				{
					category: "Date",
					type: "date",
					isAllowDuplicateCategories: false,
					operator: () => ["=", "!="]
				},
				{
					category: "Symbol",
					type: "textoptions",
					operator: ["=", "!="],
					options: ['example1', 'example2'],
					dynamicOptions:true
				},
				{
					category: "Non Dynamic",
					type: "textoptions",
					operator: ["=", "!="],
					options: ['example1', 'example2'],
				},
				{ category: "Price", type: "number" },
				{ category: "MarketCap", type: "number" },
				{ category: "IPO", type: "date" },
				{
					category: "Sector",
					type: "textoptions",
					fuzzySearchKeyAttribute: "sectorName",
					isAllowCustomValue: false,
					isAllowDuplicateOptions: false,
					options: this.getSectorOptions
				},
				{
					category: "Industry",
					type: "textoptions",
					isAllowCustomValue: false,
					options: this.getIndustryOptions
				}
			]
		}
		this.searchCharacters = this.searchCharacters.bind(this)
	}

	// API search function
	searchCharacters(category, search) {
		const searchTerm = search !=='' ? search : 'demo'
		const option = this.state.options.find(item=>{
			return item.category===category
		})
		if(!option.dynamicOptions){
			return option.options
		}
		
		fetch(
		`https://api.github.com/search/users?q=${searchTerm}`,
		{
			method: 'GET'
		}
		)
		.then(r => r.json())
		.then(r => {
			const logins = r.items.map(r=>r.login)
			this.setState({options: this.state.options.map(item=>{
				return item.category===category ? {...item, options:logins} : item 
			})})
		})
		.catch(error => {
			console.error(error);
			return [];
		});
	}

	/**
	 * [getSectorOptions Get the values for sector category]
	 * @return {[array]}
	 */
	getSectorOptions() {
		return [{ sectorName: "Finance", id: 1 }, { sectorName: "Consumer Services", id: 2 }, { sectorName: "Services", id: 3 }];
	}

	/**
	 * [getIndustryOptions Get the values for Industry category]
	 * @return {[array]}
	 */
	getIndustryOptions() {
		return [{ name: "Business Services", id: 1 }, { name: "Other Specialty Stores", id: 2 }];
	}

	getTokenItem(obj) {
		let val = obj.children;
		return `${val["category"]}: val`;
	}

	render() {
		return (
			<div className="container">
				<ReactStructuredQuerySearch
					placeholder={'Search'}
					defaultSelected={[
						{ category: "Sector", value: { sectorName: "Finance", id: 1 } },
						{ category: "Sector", value: { sectorName: "Consumer Services", id: 2 } },
						{ category: "Industry", value: { name: "Other Specialty Stores", id: 2 } }
					]}
					isAllowOperator={true}
					options={this.state.options}
					//renderTokenItem={this.getTokenItem}
					updateOptions={({ updatedValues, addedValue }) => {
						if (addedValue && addedValue.category === "Symbol" && addedValue.value === "TFSC") {
							this.options.push({
								category: "New Category",
								type: "text"
							});
							return this.options;
						}
					}}
					onTokenAdd={val => console.log(val)}
					customClasses={{
						input: "filter-tokenizer-text-input",
						results: "filter-tokenizer-list__container",
						listItem: "filter-tokenizer-list__item"
					}}
					fetchData={this.searchCharacters}
					clickToToggleOperator={false}
				/>
			</div>
		);
	}
}