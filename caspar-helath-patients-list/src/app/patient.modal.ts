export class Patient {
    public id!: string;
    public full_name!: string;
    public email!: string;
    public gender!: string;
    public age!: string;
    public avatar!: string;
    
    // Convenience functions 
    public static fromJson(json: any): Patient {
      const a = new Patient();
      a.id = json.patient_id.toString();
      a.full_name = `${json.first_name} ${json.last_name}`;
      a.email = json.email;
      a.gender = json.gender;
      a.age = json.age.toString();
      a.avatar = json.avatar;
      return a;
    }
  
  }