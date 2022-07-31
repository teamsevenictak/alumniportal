export class JobPostingModel{
    constructor(
    public companyName: String,
    public jobRole: String, 
    public companydetail: String, 
    public jobcategory: String, 
    public location: String,
    public experience: Number,
    public skills: String,
    public qualification: String,
    public jobDescription: String,
    public lastDate: String,
    public jobType: String,
    public userId: String,
    public verified: Number
    ) {}
}