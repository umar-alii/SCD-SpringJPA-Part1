package com.Mysqlpart1.My.SQL.Lab7.Software.Construction.and.Development.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Setter;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Setter
    private String patientname;
    @Setter
    private String doctorname;
    @Setter
    private int appointmentdate;



    public Student(String patientname, String doctorname, int appointmentdate){
        this.patientname = patientname;
        this.doctorname = doctorname;
        this.appointmentdate = appointmentdate;
    }

    public Student() {

    }


    public int getId() {
        return id;
    }

    public String getPatientname() {
        return patientname;
    }

    public String getDoctorname() {
        return doctorname;
    }

    public int getAppointmentdate() {
        return appointmentdate;
    }

    @Override
    public String toString() {
        return "Doctor Name "+getDoctorname()+" Patient Name "+getPatientname()+" Appointment Date "+getAppointmentdate()+" Patient ID "+getId();
    }


    //3 Question first is MCQ 2nd Question is short question and 3rd question is Code.

}
