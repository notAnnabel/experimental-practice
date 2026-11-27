using UnityEngine;
using UnityEngine.VFX;


public class BurningScript : MonoBehaviour
{
    [SerializeField] private Material burningMaterial;

    [SerializeField] private VisualEffect burningVisualEffect;
     //variable of our visual effect


    bool activated = false; 
    private float burningCounter = 0;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        burningMaterial.SetFloat("_Burning", 0);
        burningVisualEffect.SetBool("Enable", false);
        burningVisualEffect.SetBool("Enable 1", false);
        burningVisualEffect.SetBool("Smoke Active", false);
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
           activated = !activated;
        }

        if (activated && burningMaterial.GetFloat("_Burning") < 1)
        { // is fully burning, enable particles
            burningMaterial.SetFloat("_Burning", Mathf.Clamp((burningCounter += Time.deltaTime),0,1));
            //burningVisualEffect.SetBool("Enable", true);
            Debug.Log("Burning");
        }
        else if (!activated && burningMaterial.GetFloat("_Burning") >0)
        { // disable particles
            burningMaterial.SetFloat("_Burning", Mathf.Clamp((burningCounter -= Time.deltaTime),0,1));
            Debug.Log("Not Burning");
        } 

        if (burningMaterial.GetFloat("_Burning") >= 1)
        {
            burningVisualEffect.SetBool("Enable", true);
            burningVisualEffect.SetBool("Enable 1", true);
            burningVisualEffect.SetBool("Enable 1", true);
            burningVisualEffect.SetBool("Smoke Active", true);

        }
        else if (burningMaterial.GetFloat("_Burning") <= 0)
        {
            burningVisualEffect.SetBool("Enable", false);
            burningVisualEffect.SetBool("Enable 1", false);
            burningVisualEffect.SetBool("Smoke Active", true);
        }
        
    }
}

