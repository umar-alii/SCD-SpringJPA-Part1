package com.JPA.Lab6.Controller;

import com.JPA.Lab6.Entity.Hospital;
import com.JPA.Lab6.hospitalrepository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hospitals")
public class hospitalcontroller {

    private final HospitalRepository hospitalRepository;

    @Autowired
    public hospitalcontroller(HospitalRepository hospitalRepository) {
        this.hospitalRepository =  hospitalRepository;
    }

    @GetMapping("/getall")
    public List<Hospital> getall(){
        return hospitalRepository.findAll();
    }

    @GetMapping("/getbyid/{id}")
    public Optional<Hospital> getbyid(@PathVariable Long id){
        return hospitalRepository.findById(id);
    }

    @PostMapping("/bookappointment")
    public Hospital bookappointment(@RequestBody Hospital hospital){
        return hospitalRepository.save(hospital);
    }


    @PatchMapping("/updatestatus/{id}/{status}")
    public ResponseEntity<Hospital> updatestatus(@PathVariable Long id, @PathVariable String status) {
        return hospitalRepository.findById(id)
                .map(hospital -> {
                    hospital.setStatus(status);
                    Hospital updatedHospital = hospitalRepository.save(hospital);
                    return new ResponseEntity<>(updatedHospital, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Hospital> delete(@PathVariable Long id) {
        return hospitalRepository.findById(id)
                .map(hospital ->{
                    hospitalRepository.delete(hospital);
                    return new ResponseEntity<>(hospital, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }








}