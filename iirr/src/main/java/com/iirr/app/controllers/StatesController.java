package com.iirr.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iirr.app.model.RequestInputs;
import com.iirr.app.repository.PestServiceRepository;
import com.iirr.app.repository.PestServiceRepository.GetDistrictsDTO;
import com.iirr.app.repository.PestServiceRepository.GetExtent;
import com.iirr.app.repository.PestServiceRepository.GetFeature;

//@CrossOrigin(origins = "http://localhost:9090")
@RestController
@RequestMapping("/api")
public class StatesController {

	@Autowired
	PestServiceRepository pestServiceRepository;

	@PostMapping(value = "/district")
	public ResponseEntity<List<GetDistrictsDTO>> getDistrictsByStateId(@RequestBody RequestInputs reqInputs) {
		System.out.println("The state input value for getDistrict : " + reqInputs.getState_id());
		List<GetDistrictsDTO> getDistrictsDTO = pestServiceRepository.getDistrictsByStateIdService(reqInputs.getState_id());

		if (!getDistrictsDTO.isEmpty()) {
			return new ResponseEntity<>(getDistrictsDTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping(value = "/bbox")
	public ResponseEntity<List<GetExtent>> getExtentByStateId(@RequestBody RequestInputs reqInputs) {
		System.out.println("The state and district input value for getExtent : " + reqInputs.getState_id() + " and " + reqInputs.getDist());
		List<GetExtent> extent;
		if (reqInputs.getDist().equalsIgnoreCase("0")) {
			extent = pestServiceRepository.getExtentByStateIdService(reqInputs.getState_id());
		} else {
			extent = pestServiceRepository.getExtentByStateIdService(reqInputs.getState_id(), reqInputs.getDist());
		}
		if (!extent.isEmpty()) {
			return new ResponseEntity<>(extent, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping(value = "/feature")
	public ResponseEntity<List<GetFeature>> getFeatureByStateIdService(@RequestBody RequestInputs reqInputs) {
		System.out.println("The state and district input value for getFeature : " + reqInputs.getState_id() + " and " + reqInputs.getDist());
		List<GetFeature> extent;
		if (reqInputs.getDist().equalsIgnoreCase("0")) {
			extent = pestServiceRepository.getFeatureByStateIdService(reqInputs.getState_id());
		} else {
			extent = pestServiceRepository.getFeatureByStateIdService(reqInputs.getState_id(), reqInputs.getDist());
		}
		if (!extent.isEmpty()) {
			return new ResponseEntity<>(extent, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
