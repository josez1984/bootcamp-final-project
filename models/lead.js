module.exports = function(pgPool) {
    return {
        getAll: function(req, res, cb) {
            pgPool.query({
                name: 'get-all-leads',
                text: `SELECT *, 
                            (SELECT array(SELECT 
                                pc.name 
                                FROM previous_conditions pc 
                                JOIN leads_previous_conditions lpc 
                                ON lpc.prev_cond_id = pc.id 
                                WHERE lpc.lead_id = l.id
                            )) AS prev_cond_list,
                            (SELECT array(SELECT
                                it.name 
                                FROM insurance_types it
                                JOIN leads_insurance_types lit
                                ON  it.id = lit.ins_type_id
                                WHERE lit.lead_id = l.id
                            )) AS ins_type_list
                        FROM leads l
                        ORDER BY datetime DESC`                
            }).then(function(sqlRes) {
                cb(sqlRes);                                    
            }).catch(function(err) {              
                throw err;      
                cb(err);
            });
        }
    }
}