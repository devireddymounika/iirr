package com.iirr.app.model;

import javax.persistence.*;

@Entity
@Table(name = "states")
public class States {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer sno;

	@Column(name = "state")
	private String state;

	@Column(name = "state_id")
	private String state_id;

	@Column(name = "district")
	private String district;
	
	@Column(name = "district_id")
	private Integer district_id;

	public States() { /* TODO document why this constructor is empty */ }

	/**
	 * @param sno
	 * @param state
	 * @param state_id
	 * @param district
	 * @param district_id
	 */
	public States(Integer sno, String state, String state_id, String district, Integer district_id) {
		super();
		this.sno = sno;
		this.state = state;
		this.state_id = state_id;
		this.district = district;
		this.district_id = district_id;
	}

	/**
	 * @return the sno
	 */
	public Integer getSno() {
		return sno;
	}

	/**
	 * @param sno the sno to set
	 */
	public void setSno(Integer sno) {
		this.sno = sno;
	}

	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * @return the state_id
	 */
	public String getState_id() {
		return state_id;
	}

	/**
	 * @param state_id the state_id to set
	 */
	public void setState_id(String state_id) {
		this.state_id = state_id;
	}

	/**
	 * @return the district
	 */
	public String getDistrict() {
		return district;
	}

	/**
	 * @param district the district to set
	 */
	public void setDistrict(String district) {
		this.district = district;
	}

	/**
	 * @return the district_id
	 */
	public Integer getDistrict_id() {
		return district_id;
	}

	/**
	 * @param district_id the district_id to set
	 */
	public void setDistrict_id(Integer district_id) {
		this.district_id = district_id;
	}
	
	
}
