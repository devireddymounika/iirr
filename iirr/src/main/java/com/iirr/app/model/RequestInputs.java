package com.iirr.app.model;

public class RequestInputs {
	private String state_id;
	private String dist;
	
	public RequestInputs() {}

	/**
	 * @param state_id
	 */
	/*
	 * public RequestInputs(String state_id) { super(); this.state_id = state_id; }
	 */

	public RequestInputs(String state_id, String dist) {
		super();
		this.state_id = state_id;
		this.dist = dist;
	}

	public String getState_id() {
		return state_id;
	}

	public void setState_id(String state_id) {
		this.state_id = state_id;
	}

	public String getDist() {
		return dist;
	}

	public void setDist(String dist) {
		this.dist = dist;
	}


}
