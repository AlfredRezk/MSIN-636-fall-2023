const query = (model, populate) => async(req, res, next)=>{

    // Search Functionality 
    // http://localhost:5000/api/personnal?search[title]=value&search[firstName]=value2
    const search = req.query.search || {}
    for(let key in search)
        search[key] = {$regex: search[key], $options:'i'} // i: case Insensitive
    let query = model.find(search)
    // Select 
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }
    // Sort 
    if(req.query.sort){
        query.sort(req.query.sort)
    }else{
        // Default sort
        query.sort('-createdAt')
    }

    // Pagination
    // http://localhost:5000/api/personnel?page=1&limit=5
    const page = parseInt(req.query.page)|| 1;
    const limit = parseInt(req.query.limit)|| 100;
    const startIndex = (page-1) * limit;
    const endIndex = page*limit;
    const total = await model.countDocuments();
    query = query.skip(startIndex).limit(limit)
    const pagination = {page, limit}
    if(endIndex<total)  pagination.next = {page:page+1, limit};
    if(startIndex>0) pagination.prev = {page:page-1, limit}
    // Populate
    if(populate&&!req.query.select) query = query.populate(populate);

    // Execute
       const results = await query
        res.results = {
        success:true, 
        count: results.length, 
        data: results, 
        pagination
    }
    next()
} 
module.exports = query